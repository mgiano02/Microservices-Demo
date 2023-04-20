from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import BinVO, Shoe

class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = ["model_name"]

class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = ["model_name", "manufacturer", "color", "picture"]

    def get_extra_data(self, o):
        return {"bin": o.bin.bin_number}

@require_http_methods(["GET", "POST"])
def api_list_shoes(request):
    if request.method == "GET":
        shoes = Shoe.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeListEncoder
        )

    else:
        content = json.loads(request.body)
        try:
            bin = BinVO.objects.get(bin_vo_id=content["bin"])
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin name"},
                status=400
            )
        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_shoe(request, pk):
    if request.method == "GET":
        shoe = Shoe.objects.get(id=pk)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False
        )
    elif request.method == "PUT":
        try:
            shoe = Shoe.objects.get(id=pk)
        except Shoe.DoesNotExist:
            response = JsonResponse({"message": "Shoe doesn't exist"})
            response.status_code = 400
            return response
        try:
            content = json.loads(request.body)
            try:
                if "bin" in content:
                    bin = BinVO.objects.get(bin_vo_id=content["bin"])
                    content["bin"] = bin
            except BinVO.DoesNotExist:
                return JsonResponse(
                    {"message": "Invalid bin id"}
                )
        except json.JSONDecodeError:
            response = JsonResponse({"message": "Bad JSON"})
            response.status_code = 400
            return response

        for field in content:
            setattr(shoe, field, content[field])

        shoe.save()

        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False
        )


    else:
        count, _ = Shoe.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
