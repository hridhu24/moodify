from advanced_emotion import predict_emotion

test_inputs = [
    # SADNESS
    "I am feeling low today",
    "I'm sad and exhausted.",
    "Nothing feels right anymore.",
    "Life feels heavy right now.",

    # ANGER
    "I am frustrated",
    "I'm so angry right now!",
    "This is making me mad.",
    "I can't control my anger today.",

    # JOY
    "I am very happy today!",
    "I'm feeling amazing!",
    "Today has been wonderful.",
    "I feel grateful and blessed.",

    # FEAR / ANXIETY
    "I am anxious about my exams",
    "I'm scared of what's going to happen.",
    "I feel nervous and uneasy.",
    "This situation stresses me out.",

    # LOVE / AFFECTION
    "I love everyone",
    "My heart feels full of love.",
    "I'm feeling affectionate.",
    "I'm grateful for my friends.",

    # SURPRISE
    "What a surprise!",
    "Wow, I didn't expect that!",
    "This is unbelievable!",
    "That shocked me!",

    # NEUTRAL
    "I'm okay.",
    "It's fine.",
    "Nothing much is happening.",
    "Just a normal day.",

    # RELAXED (keyword override)
    "I feel calm and peaceful.",
    "Just chilling now.",
    "I feel very relaxed.",

    # MOTIVATED (keyword override)
    "I feel so motivated today!",
    "I'm pumped and driven.",
    "I'm ready to achieve great things!",
]

for t in test_inputs:
    print("\n>>>", t)
    print(predict_emotion(t))
