from transformers import CLIPProcessor, CLIPModel
import torch

_model = None
_processor = None
_device = None

def get_device():
    global _device
    if _device is None:
        _device = "cuda" if torch.cuda.is_available() else "cpu"
    return _device

def load_clip(model_name: str = "openai/clip-vit-base-patch32"):
    global _model, _processor
    if _model is None or _processor is None:
        _model = CLIPModel.from_pretrained(model_name)
        _processor = CLIPProcessor.from_pretrained(model_name)
        _model.to(get_device())
        _model.eval()
    return _model, _processor
