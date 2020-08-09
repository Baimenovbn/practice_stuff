from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('testapi/', views.testDataAPI, name='testapi'),
    path('create-test/', views.createTest, name='createTest'),
    path('delete-test/', views.deleteTest, name='deleteTest'),
    path('update-test/', views.updateTest, name='updateTest'),
]