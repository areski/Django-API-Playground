from tastypie.authorization import Authorization
from tastypie.resources import ModelResource

from links.models import Link


class LinksResource(ModelResource):

    class Meta:
        resource_name = "links"
        authorization = Authorization()
        queryset = Link.objects.all()