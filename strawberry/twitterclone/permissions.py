from rest_framework.permissions import BasePermission

SAFE_METHODS = ("GET", "OPTIONS", "HEAD")


class IsAuthenticatedOrPost(BasePermission):
    """
    If the user is unauthenticated, they can only access the POST method.
    """

    def has_permission(self, request, view):
        return (
            request.method == "POST" or request.user and request.user.is_authenticated
        )


class ModifyIfAuthor(BasePermission):
    """
    Allows modification of objects only if the user is the author of the object.
    """

    def has_object_permission(self, request, view, obj):
        return (
            request.method in SAFE_METHODS or request.user and request.user == obj.author
        )
