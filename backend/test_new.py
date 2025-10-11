import numpy as np
import advanced_emotion as ae  # import the module, not individual variables

ae.load_model()  # this sets up ae._tokenizer and ae._session

texts = [
    "I am happy",
    "I am sad",
    "I am angry",
    "I am scared",
    "I am surprised",
    "I am in love"
]

for t in texts:
    inputs = ae._tokenizer(
        t,
        truncation=True,
        padding="max_length",
        max_length=128,
        return_tensors="np",
    )
    ort_inputs = {"input_ids": inputs["input_ids"]}
    logits = ae._session.run(None, ort_inputs)[0][0]
    print(f"\n🧠 Text: {t}")
    
    
    print("Argmax index:", np.argmax(logits))
