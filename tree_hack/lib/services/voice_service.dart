import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:permission_handler/permission_handler.dart';
import 'dart:async';
import 'package:just_audio/just_audio.dart';
import 'package:speech_to_text/speech_to_text.dart' as stt;
import 'package:path_provider/path_provider.dart';
import 'dart:io';

class VoiceService {
  final String elevenLabsApiKey =
      'sk_934f3ade6cb2b477d0c0764f9eea660515f1902c85f5a00a';
  final String openAIKey =
      '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';
  final String voiceId = '29vD33N1CtxCmqQRPOHJ';
  final String baseUrl = 'https://api.elevenlabs.io';

  bool _isConversationActive = false;
  bool _isListening = false;
  bool _isProcessingInput = false;
  final AudioPlayer _audioPlayer = AudioPlayer();
  final stt.SpeechToText _speechToText = stt.SpeechToText();
  List<Map<String, String>> conversationHistory = [];

  Future<void> _handleUserInput(String userInput, BuildContext context) async {
    try {
      // Get AI response
      final response = await http.post(
        Uri.parse('https://api.openai.com/v1/chat/completions'),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer $openAIKey',
        },
        body: jsonEncode({
          "model": "gpt-3.5-turbo",
          "messages": [
            {
              "role": "system",
              "content": "You are a helpful assistant. Keep responses concise."
            },
            ...conversationHistory,
            {"role": "user", "content": userInput}
          ],
          "max_tokens": 150,
          "temperature": 0.7,
        }),
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        String aiResponse = data['choices'][0]['message']['content'];
        conversationHistory.add({"role": "user", "content": userInput});
        conversationHistory.add({"role": "assistant", "content": aiResponse});

        if (conversationHistory.length > 10) {
          conversationHistory.removeRange(0, 2);
        }

        await _generateAndPlayResponse(aiResponse, context);
      } else {
        throw Exception('Failed to get AI response: ${response.statusCode}');
      }
    } catch (e) {
      print('Error: $e');
      await _generateAndPlayResponse(
          "I'm sorry, I couldn't understand that. Please try again.", context);
    }
  }

  Future<void> _generateAndPlayResponse(
      String text, BuildContext context) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/text-to-speech/$voiceId'),
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': elevenLabsApiKey,
          'accept': 'audio/mpeg',
        },
        body: jsonEncode({
          "text": text,
          "model_id": "eleven_monolingual_v1",
          "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.5,
            "style": 0.5,
            "use_speaker_boost": true
          }
        }),
      );

      if (response.statusCode == 200) {
        final directory = await getTemporaryDirectory();
        final file = File('${directory.path}/temp_audio.mp3');
        await file.writeAsBytes(response.bodyBytes);

        // Configure and play audio
        await _audioPlayer.stop();
        await _audioPlayer.setFilePath(file.path);
        await _audioPlayer.setVolume(1.0);

        // Play and wait for completion
        await _audioPlayer.play();
        await _audioPlayer.processingStateStream.firstWhere(
          (state) => state == ProcessingState.completed,
        );

        print('Audio playback completed');
      } else {
        throw Exception(
            'Failed to generate voice response: ${response.statusCode}');
      }
    } catch (e) {
      print('Error in voice generation: $e');
      showError(context, 'Error in voice generation');
    }
  }

  Future<void> startListening(BuildContext context) async {
    if (!_isListening) {
      _isListening = true;
      await _speechToText.listen(
        onResult: (result) async {
          if (result.finalResult && result.recognizedWords.isNotEmpty) {
            _isProcessingInput = true;
            String userInput = result.recognizedWords;
            print('User said: $userInput');

            if (userInput.toLowerCase().contains('goodbye') ||
                userInput.toLowerCase().contains('bye')) {
              await stopConversation(context);
              return;
            }

            await _handleUserInput(userInput, context);
            _isProcessingInput = false;
          }
        },
        listenMode: stt.ListenMode.dictation,
        partialResults: true,
        listenFor: const Duration(seconds: 30),
        pauseFor: const Duration(seconds: 3),
        cancelOnError: false,
        localeId: 'en_US',
      );
    }
  }

  Future<void> stopListening() async {
    if (_isListening) {
      _isListening = false;
      await _speechToText.stop();
      await _audioPlayer.stop();
    }
  }

  Future<void> startConversation(BuildContext context) async {
    if (_isConversationActive) return;

    if (!await checkMicrophonePermission(context)) return;

    _isConversationActive = true;
    conversationHistory.clear();

    try {
      bool available = await _speechToText.initialize(
        onError: (error) => print('Speech recognition error: $error'),
        onStatus: (status) => print('Speech recognition status: $status'),
      );

      if (available) {
        await _generateAndPlayResponse(
            "Hello! How can I help you today?", context);
        await startListening(context);
      } else {
        throw Exception('Speech recognition not available');
      }
    } catch (e) {
      print('Error starting conversation: $e');
      _isConversationActive = false;
      showError(context, 'Failed to start conversation');
    }
  }

  Future<void> stopConversation(BuildContext context) async {
    _isConversationActive = false;
    _isListening = false;
    _isProcessingInput = false;
    await stopListening();
    await _generateAndPlayResponse("Goodbye! Have a great day!", context);
  }

  Future<bool> checkMicrophonePermission(BuildContext context) async {
    final status = await Permission.microphone.request();
    if (!status.isGranted) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Microphone permission is required")),
      );
      return false;
    }
    return true;
  }

  void showError(BuildContext context, String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(message),
        backgroundColor: Colors.red,
        duration: const Duration(seconds: 2),
      ),
    );
  }

  void dispose() {
    stopListening();
    _audioPlayer.dispose();
    conversationHistory.clear();
  }
}
