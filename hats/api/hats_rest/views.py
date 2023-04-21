from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import LocationVO, Hat

# Create your views here.
# Used to access information from locations as properties
class LocationVOEncoder(ModelEncoder):
    model = LocationVO
    properties = ["closet_name",
                  "section_number",
                  "shelf_number",
                  "import_href"]


# Used to tell views which pieces of information to access in the hat list
class HatListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "fabric",
        "style_name",
        "color",
        "picture_url",
        "id"
    ]

    def get_extra_data(self, o):
        return {"location": o.location.closet_name}



# Used to tell views which pieces of information to access in the hat details
class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "fabric",
        "style_name",
        "color",
        "picture_url",
        "location"
    ]
    encoders = {
        "location": LocationVOEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_hats(request):
    # Obtains hat list
    if request.method == "GET":
        hats = Hat.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatListEncoder,
        )
    # Creates a new hat
    else:
        content = json.loads(request.body)

        # Get the LocationVO object and put it in the content dict
        try:
            location = LocationVO.objects.get(id=content["location"])
            content["location"] = location

        # Return error if location doesn't exist
        except LocationVO.DoesNotExist:
            return JsonResponse({"message": "Invalid location id"}, status=400)

        # Adds a new hat based on the Hat object model with the information
        # available from the encoder
        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )

@require_http_methods(["GET", "PUT", "DELETE"])
# Gets a specific hat based on the pk and shows the details for it
def api_show_hat(request, pk):
    if request.method == "GET":
        hat = Hat.objects.get(id=pk)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )
    # Obtains a hat based on the pk and deletes it from DB
    elif request.method == "DELETE":
        count, _ = Hat.objects.filter(id=pk).delete()
        # Returns string:boolean stating if object has been deleted or not
        return JsonResponse({"deleted": count > 0})
    # Obtains a hat based on the pk and updates the information from the hat
    # detail encoder
    else:
        content = json.loads(request.body)

        Hat.objects.filter(id=pk).update(**content)
        hat = Hat.objects.get(id=pk)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )
