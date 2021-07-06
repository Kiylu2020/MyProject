"""Django URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
'''导入应用'''
from ECUSTapp.views import *

'''配置媒体文件夹'''
from django.views.static import serve
from Django.settings import MEDIA_ROOT
urlpatterns = [
    path('', admin.site.urls),
    path('index_notice_msg/', index_notice_msg),
    path('news_ECUST_list/', news_ECUST_list),
    path('news_ECUST_detail', news_ECUST_detail),
    path('inserttest/', inserttest),
    path('user_upload/', user_upload),
    path('user_level_get/', user_level_get),
    path('quanxianshenqing/', quanxianshenqing),
    path('bbs_questions/', bbs_question),
    path('bbs_question_title/', bbs_question_title),
    path('bbs_question_detail/', bbs_question_detail),
    path('bbs_question_ans/', bbs_question_ans),
    path('bbs_question_dianzan/', bbs_question_dianzan),
    # 这段别复制
    path('yjx_dxh_upload/', upload),
    # 配置媒体文件夹的路由
    re_path('media/(?P<path>.*)', serve, {'document_root': MEDIA_ROOT}, name='media'),
]
