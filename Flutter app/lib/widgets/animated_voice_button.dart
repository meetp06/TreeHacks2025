import 'package:flutter/material.dart';
import 'package:tree_hack/services/voice_service.dart';
import 'dart:math' as math;

class AnimatedVoiceButton extends StatefulWidget {
  final bool isRecording;
  final VoidCallback onTap;

  const AnimatedVoiceButton({
    super.key,
    required this.isRecording,
    required this.onTap,
  });

  @override
  _AnimatedVoiceButtonState createState() => _AnimatedVoiceButtonState();
}

class _AnimatedVoiceButtonState extends State<AnimatedVoiceButton>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;
  late Animation<double> _pulseAnimation;
  bool _hasPermission = false;
  bool _isInitialized = false;
  final VoiceService _voiceService = VoiceService();

  @override
  void initState() {
    super.initState();
    _initializeAnimations();
    _checkPermission();
  }

  void _initializeAnimations() {
    _controller = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );

    _scaleAnimation = Tween<double>(begin: 1.0, end: 1.1).animate(
      CurvedAnimation(
        parent: _controller,
        curve: Curves.easeInOut,
      ),
    );

    _pulseAnimation = Tween<double>(begin: 1.0, end: 1.2).animate(
      CurvedAnimation(
        parent: _controller,
        curve: Curves.easeInOut,
      ),
    );
  }

  Future<void> _checkPermission() async {
    try {
      _hasPermission = await _voiceService.checkMicrophonePermission(context);
      if (mounted) {
        setState(() {
          _isInitialized = true;
        });
      }
    } catch (e) {
      print('Error checking permission: $e');
      _showError('Failed to check microphone permission');
    }
  }

  void _showError(String message) {
    if (mounted) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(message),
          backgroundColor: Colors.red,
          duration: const Duration(seconds: 2),
        ),
      );
    }
  }

  @override
  void didUpdateWidget(AnimatedVoiceButton oldWidget) {
    super.didUpdateWidget(oldWidget);
    _handleRecordingStateChange(oldWidget.isRecording);
  }

  void _handleRecordingStateChange(bool wasRecording) async {
    if (widget.isRecording != wasRecording) {
      if (widget.isRecording) {
        _startRecording();
      } else {
        _stopRecording();
      }
    }
  }

  void _startRecording() async {
    if (!_hasPermission) {
      _hasPermission = await _voiceService.checkMicrophonePermission(context);
      if (!_hasPermission) {
        _showError('Microphone permission is required');
        return;
      }
    }

    try {
      _controller.repeat(reverse: true);
      await _voiceService.startConversation(context);
    } catch (e) {
      print('Error starting recording: $e');
      _showError('Failed to start recording');
      _controller.stop();
    }
  }

  void _stopRecording() async {
    try {
      _controller.stop();
      _controller.reset();
      await _voiceService.stopConversation(context);
    } catch (e) {
      print('Error stopping recording: $e');
      _showError('Failed to stop recording');
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    _voiceService.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (!_isInitialized) {
      return const Center(child: CircularProgressIndicator());
    }

    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Stack(
          alignment: Alignment.center,
          children: [
            if (widget.isRecording) ..._buildRippleEffects(),
            _buildMainButton(),
          ],
        ),
        const SizedBox(height: 20),
        _buildStatusText(),
      ],
    );
  }

  List<Widget> _buildRippleEffects() {
    return List.generate(3, (index) {
      return AnimatedBuilder(
        animation: _controller,
        builder: (context, child) {
          return Transform.scale(
            scale: _pulseAnimation.value - (index * 0.1),
            child: Container(
              width: 220,
              height: 220,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: Colors.blue.withOpacity(0.1 - (index * 0.03)),
              ),
            ),
          );
        },
      );
    });
  }

  Widget _buildMainButton() {
    return GestureDetector(
      onTap: () async {
        if (!_hasPermission) {
          _hasPermission =
              await _voiceService.checkMicrophonePermission(context);
          if (_hasPermission) {
            widget.onTap();
          }
        } else {
          widget.onTap();
        }
      },
      child: AnimatedBuilder(
        animation: _scaleAnimation,
        builder: (context, child) {
          return Transform.scale(
            scale: widget.isRecording ? _scaleAnimation.value : 1.0,
            child: Container(
              width: 200,
              height: 200,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: Colors.grey[200],
                boxShadow: widget.isRecording
                    ? [
                        BoxShadow(
                          color: Colors.blue.withOpacity(0.3),
                          blurRadius: 10,
                          spreadRadius: 5,
                        )
                      ]
                    : null,
              ),
              child: const Center(
                child: Image(
                  image: AssetImage("assets/images/help.png"),
                  width: 150,
                  height: 150,
                  fit: BoxFit.contain,
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildStatusText() {
    return AnimatedSwitcher(
      duration: const Duration(milliseconds: 300),
      child: Text(
        widget.isRecording ? 'Tap to stop' : 'Tap to voice chat',
        key: ValueKey<bool>(widget.isRecording),
        style: TextStyle(
          fontSize: 18,
          fontWeight: FontWeight.bold,
          color: widget.isRecording ? Colors.blue : Colors.black,
        ),
      ),
    );
  }
}

