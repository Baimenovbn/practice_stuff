from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Test
import json

# Create your views here.
def index(request):
    return render(request, 'table/index.html')

def testDataAPI(request):
    tests = Test.objects.all()
    dataList = []

    for test in tests:
        dataList.append({'name': test.name, 'result': test.result, 'id': test.id})

    return JsonResponse(dataList, safe=False)

def createTest(request):
    data = json.loads(request.body)
    name = data['name']
    result = data['result']
    Test.objects.create(
        name=name,
        result=result,
    )
    
    return JsonResponse('Test Created', safe=False)

def deleteTest(request):
    testId = json.loads(request.body)
    test = Test.objects.get(id=testId)
    test.delete()
    return JsonResponse('Test Have Been Deleted', safe=False)

def updateTest(request):
    data = json.loads(request.body)
    testId = data['id']
    newText = data['newText']
    test = Test.objects.get(pk=testId)
    test.result = newText
    test.save()

    return JsonResponse('Test Have Been Updated', safe=False)