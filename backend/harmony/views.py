from django.shortcuts import render
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage

from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser, FormParser

from .serializers import ComposerSerializer, TextbookSerializer
from .models import Composer, Textbook

"""
    class ComposerView(viewsets.ModelViewSet):
    serializer_class = ComposerSerializer
    queryset = Composer.objects.all()
"""

class ComposerView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        data = []
        next_page = 1
        previous_page = 1
        composers = Composer.objects.all()
        page = request.GET.get("page", 1)
        paginator = Paginator(composers, 20)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = ComposerSerializer(data, context={'request': request}, many=True)
        serializer_for_filters = ComposerSerializer(composers, context={'request': request}, many=True)
        if data.has_next():
            next_page = data.next_page_number()
        if data.has_previous():
            previous_page = data.previous_page_number()
        
        return Response({"data": serializer.data,
                        "fullData": serializer_for_filters.data,
                         "count": paginator.count, 
                         "numpages": paginator.num_pages, 
                         "nextlink": "/api/composers/?page=" + str(next_page),
                         "prevlink": "/api/composers/?page=" + str(previous_page)})

    def post(self, request, *args, **kwargs):
        serializer = ComposerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def composers_detail(request, pk):
    try:
        composer = Composer.objects.get(pk=pk)
    except Composer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "GET":
        serializer = ComposerSerializer(composer, context={"request": request})
        return Response(serializer.data)
        
    elif request.method == "PUT":
        serializer = ComposerSerializer(composer, data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == "DELETE":
        composer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class TextbookView(APIView):
    def get(self, request, *args, **kwargs):
        textbooks = Textbook.objects.all()
        serializer = TextbookSerializer(textbooks, context={'request': request}, many=True)
        return Response({"data": serializer.data})

    def post(self, request, *args, **kwargs):
        serializer = TextbookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)