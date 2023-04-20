import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "shoes_project.settings")
django.setup()

# Import models from hats_rest, here.
# from shoes_rest.models import Something


from shoes_rest.models import BinVO

def poll():
    while True:
        print('Shoes poller polling for data')
        try:
            bin_url = "http://wardrobe-api:8000/api/bins/"
            response = requests.get(bin_url)
            content = json.loads(response.content)
            print(content)
            for bin in content["bins"]:
                BinVO.objects.update_or_create(
                    closet_name=bin["closet_name"],
                    defaults={"closet_name":bin["closet_name"]}
                )

        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
