package com.example.mood_quotes;

import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class QuotesController {

    private final Map<String, List<String>> quotes = Map.of(
        "happy", List.of(
            "Happiness is not out there, it’s in you.",
            "Smile big, laugh often.",
            "Good vibes only!"
        ),
        "sad", List.of(
            "It’s okay to feel sad. Better days are coming.",
            "Tears are words that the heart can’t say.",
            "Every storm runs out of rain."
        ),
        "motivated", List.of(
            "Push yourself, because no one else will.",
            "You are stronger than you think.",
            "Dream big, work hard."
        ),
        "anxious", List.of(
            "Take a deep breath, you've got this.",
            "Anxiety is just a feeling, it will pass.",
            "One step at a time, you're doing great."
        ),
        "calm", List.of(
            "Peace begins with a smile.",
            "In the midst of chaos, find your calm.",
            "Breathe in peace, breathe out stress."
        )
    );

    @GetMapping("/quotes")
    public ResponseEntity<Map<String, String>> getQuote(@RequestParam String mood) {
        String normalized = mood == null ? "" : mood.trim().toLowerCase();
        List<String> options = quotes.get(normalized);
        if (options == null || options.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of(
                        "error", "Unsupported mood. Try: happy, sad, motivated, anxious, calm."
                    ));
        }
        String quote = options.get(new Random().nextInt(options.size()));
        return ResponseEntity.ok(Map.of(
            "mood", normalized,
            "quote", quote
        ));
    }
}
