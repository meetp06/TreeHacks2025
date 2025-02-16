import 'package:flutter/material.dart';

class HistoryScreen extends StatelessWidget {
  final List<Map<String, dynamic>> historyItems = List.generate(
    10,
    (index) => {
      'date':
          DateTime.now().subtract(Duration(days: index)).toString().split(' ')[0],
      'duration': '${index + 1}:${index * 10}',
      'type': index % 2 == 0 ? 'Voice Call' : 'Chat',
    },
  );

  HistoryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('History'),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: ListView.builder(
        itemCount: historyItems.length,
        itemBuilder: (context, index) {
          final item = historyItems[index];
          return Card(
            margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: ListTile(
              leading: Icon(
                item['type'] == 'Voice Call' ? Icons.mic : Icons.chat,
                color: Colors.blue,
              ),
              title: Text(item['type']),
              subtitle: Text('Duration: ${item['duration']}'),
              trailing: Text(item['date']),
            ),
          );
        },
      ),
    );
  }
}
