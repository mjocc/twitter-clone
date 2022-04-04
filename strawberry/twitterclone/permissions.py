from rest_framework import permissions


class DeleteIfAuthor(permissions.BasePermission):
    """
    Allows deletion of objects only if the user is the 'author' of the object.
    """

    def has_object_permission(self, request, view, obj):
        if request.method != "DELETE":
            return True

        return obj.author == request.user


class ModifyIfUser(permissions.BasePermission):
    """
    Allows modification of user account only if the user is the owner of that account.
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True

        return obj == request.user