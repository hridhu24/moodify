from transformers import AutoModelForSequenceClassification
import torch

model = AutoModelForSequenceClassification.from_pretrained("bhadresh-savani/distilbert-base-uncased-emotion")
dummy = torch.randint(0, 2000, (1, 128))  # sample input
torch.onnx.export(model, (dummy,), "emotion_model.onnx", input_names=["input_ids"], output_names=["logits"], opset_version=14)
