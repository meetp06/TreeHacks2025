import 'package:flutter/material.dart';

class VoiceScreen extends StatelessWidget {
  const VoiceScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Care Car',
              style: TextStyle(
                fontSize: 1,
                fontWeight: FontWeight.bold,
                color: Colors.grey[300],
              ),
            ),
            Text(
              'West Nest',
              style: TextStyle(
                fontSize: 1,
                fontWeight: FontWeight.bold,
                color: Colors.grey[300],
              ),
            ),
            // Note: The main voice button is handled in the home screen
          ],
        ),
      ),
    );
  }
}
