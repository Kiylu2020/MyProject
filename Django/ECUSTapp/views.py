from django.http import *
from django.shortcuts import render
from ECUSTapp.models import *
from django.forms.models import model_to_dict
import json
from . import models
# Create your views here.
def index_notice_msg(request):
    notice_id = MSG.objects.count()
    rs_ = MSG.objects.filter(id=notice_id).values('title')
    rs = []
    for r in rs_:
        rs = r.get('title')
    return JsonResponse({'id': notice_id, 'rs': rs})

# 新闻表标题函数
def news_ECUST_list(request):
    data = request.body
    json_str = data.decode()
    dict_data = json.loads(json_str)
    print(dict_data)
    rs_list = []
    p = dict_data.get('page')   #获取当前页面数
    page = p if p != '' else 1  #当前页面取整
    rows = 5
    offset = (page - 1)*rows
    count = MSG.objects.count()
    rs = MSG.objects.all().order_by('-id')[offset:offset+5]
    for r in rs:
        rs_dict = model_to_dict(r, exclude='content')
        rs_list.append(rs_dict)
    msg = {'total': count, 'list': rs_list}
    print(msg)
    return JsonResponse(msg)

# 新闻表内容接口函数
def news_ECUST_detail(request):
    data = request.body
    json_str = data.decode()
    dict_data = json.loads(json_str)
    item_id = dict_data.get('id')
    rs_list = []
    rs = MSG.objects.filter(id=item_id)
    for r in rs:
        rs_dict = model_to_dict(r)
        rs_list.append(rs_dict)
    print(rs_list)
    res = {'rs': rs_list}
    return JsonResponse(res)

def index(request):
    return render(request, 'index.html')

# 报名表接口函数
def inserttest(request):
    post_num = 1
    data = request.body
    print(data)
    json_str = data.decode()
    dict_data = json.loads(json_str)
    print(dict_data)
    # 获取小程序端上传的数据
    name_ = dict_data.get("name")
    subject_ = dict_data.get("subject")
    phone_ = dict_data.get("phone")
    qq_ = dict_data.get("qq")
    email_ = dict_data.get("email")
    province_ = dict_data.get("province")
    fraction_ = dict_data.get("fraction")
    highschool_ = dict_data.get("highschool")
    remark_ = dict_data.get("remark")
    print(remark_)
    tphone_ = APPLY.objects.filter(qq=qq_, name=name_).values('phone')
    print(subject_)
    print(tphone_)
    apply = APPLY(name=name_, province=province_, fraction=fraction_, phone=phone_, subject=subject_, qq=qq_,
                  email=email_, highschool=highschool_, remarks=remark_)
    if tphone_.count() == 0:
        apply.save()
    else:
        postnum_ = APPLY.objects.filter(phone=phone_).values('postnum')
        print(postnum_)
        for p in postnum_:
            print("Value : %s" % p.get('postnum'))
            post_num = p.get('postnum')
            post_num += 1
        if post_num <= 3:
            postnum_.update(postnum=post_num, name=name_, province=province_, fraction=fraction_, phone=phone_, subject=subject_, qq=qq_,
                  email=email_, highschool=highschool_, remarks=remark_)
        else:
            print("已经提交过三次")
            return JsonResponse({'pd': 1, 'postnum': post_num})

    return JsonResponse({'pd': 0, 'postnum': post_num})


# 用户资料信息更新API
def user_upload(request):
    data = request.body
    json_str = data.decode()
    dict_data = json.loads(json_str)
    name = dict_data.get("name")
    province = dict_data.get("province")
    url = dict_data.get("url")
    count = WXUSER.objects.count()
    user_id = count + 1000000
    tid = WXUSER.objects.filter(user_icon=url, nickname=name).values("userID")
    if tid.count() == 0:
        user = WXUSER(userID=user_id, nickname=name, province=province, user_icon=url)
        user.save()
        return JsonResponse({'userid': user_id})
    return JsonResponse({'userid': user_id-1})

# 获取用户等级权限值
def user_level_get(request):
    data = request.body
    json_str = data.decode()
    dict_data = json.loads(json_str)
    userid = int(dict_data.get('userid'))
    levels = WXUSER.objects.filter(userID=userid)
    for item in levels:
        level = model_to_dict(item)
        level = level.get('level')
    return JsonResponse({'level': level})

# 申请权限API
def quanxianshenqing(request):
    # 获取数据并转换格式
    data = request.body
    print(data)
    json_str = data.decode()
    dict_data = json.loads(json_str)
    # 将格式转换好的数据保存到以下的临时变量中
    formdata = dict_data.get("formdata")
    teacher_Name = formdata.get("name")
    teacher_ID = formdata.get("gonghao")
    gender_ = dict_data.get("sex")
    phone_ = formdata.get("phone")
    email_ = formdata.get("emai")
    # 专业
    subject_ = formdata.get("zhuany")
    wechat_ID = formdata.get("wx")
    # 学院
    academy_ = dict_data.get("xueyuan")
    # 职称
    position_ = formdata.get("zc")
    # 部门
    department_ = formdata.get("bm")
    
    tid = TEACHERS.objects.filter(teacherID=teacher_ID).values("teacherID")
    if tid.count() == 0:
        teachers = TEACHERS(teacherID=teacher_ID, teacherName=teacher_Name,
                            gender=gender_, phone=phone_, email=email_, subject=subject_,
                            wechatID=wechat_ID, academy=academy_, position=position_,
                            department=department_)
        teachers.save()
        return JsonResponse({'pd': 0})
    else:
        return JsonResponse({'pd': 1})

# 论坛提问接口（从前端上传数据到后台）以及点赞更改楼层的操作
def bbs_question(request):
    # 当请求方式为POST时将数据存入数据库
    if request.method == 'POST':
        data = request.body
        json_str = data.decode()
        dict_data = json.loads(json_str)
        print(dict_data)
        # 将从前台获取的数据储存在临时变量中
        formdata = dict_data.get('formdata')
        title = formdata.get("title")
        detail = formdata.get("detail")
        nickname = dict_data.get('nickname')
        question_sort = dict_data.get('questionSort')
        icon_url = dict_data.get('icon_url')
        loca = dict_data.get('location')  # 获取所在地
        # 读取数据库中已有多少条数据
        num = QUES.objects.all().count()
        print(num)
        question_id = num + 10000000
        # 判断该条数据是否可以存入数据库（没有重复数据）
        pd = QUES.objects.filter(quesTitle=title, quesDetails=detail)
        # 存入数据库中(问题所属于楼层与问题id暂时绑定)
        if pd.count() == 0:
            question = QUES(quesDetails=detail, quesTitle=title, quesSort=question_sort, quesLocation=loca,
                            username=nickname, user_icon=icon_url, quesFloor=num, quesID=question_id)
            question.save()
        return JsonResponse({'ecust': 'jsj'})
    # 当请求方式为GET时返回数据
    # 返回的问题按照楼层排序
    else:
        
        return JsonResponse({'ecust': 'ai'})

# 论坛标题列表接口
def bbs_question_title(request):
    data = request.body
    json_str = data.decode()
    dict_data = json.loads(json_str)
    rs_list = []
    w = dict_data.get('showWay')  # 获取排序方式
    p = dict_data.get('page')  # 获取当前页面数
    l = dict_data.get('location')   # 获取所在地
    # 处理返回的问题列表
    page = p if p != '' else 1  # 当前页面取整
    rows = 8
    offset = (page - 1) * rows
    count = QUES.objects.count()
    # 根据不同的方式进行筛选
    if w == 1:
        rs = QUES.objects.filter(quesLocation=l).order_by('-quesDate')[offset:offset + 8]
    elif w == 2:
        rs = QUES.objects.filter(quesLocation=l).order_by('quesFloor')[offset:offset + 8]
    # 存入数组
    for r in rs:
        rs_dict = model_to_dict(r, exclude='quesDetails')
        rs_list.append(rs_dict)
    question = {'total': count, 'list': rs_list}
    return JsonResponse(question)

# 论坛详情返回数据接口
def bbs_question_detail(request):
    data = request.body
    json_str = data.decode()
    dict_data = json.loads(json_str)
    item_id = dict_data.get('id')
    print(item_id)
    rs_list = []
    # 获取回答
    ques_obj = models.QUES.objects.get(id=item_id)
    ans = ques_obj.ans_ques.all()
    for a in ans:
        rs = model_to_dict(a)
        rs_list.append(rs)
    # 获取问题内容
    ques = QUES.objects.filter(id=item_id)
    for que in ques:
        ques_Detail = que.quesDetails
    res = {'question': ques_Detail, 'list': rs_list}
    return JsonResponse(res)

# 论坛详情页面评论发送到数据库接口
def bbs_question_ans(request):
    data = request.body
    json_str = data.decode()
    dict_data = json.loads(json_str)
    pinglun = dict_data.get("pinglun")
    nickname = dict_data.get('nickname')
    icon_url = dict_data.get('icon_url')
    ques_id = int(dict_data.get('ques_id')) + 10000000 - 1
    print(pinglun)
    print(nickname)
    print(icon_url)
    print(ques_id)
    # 创建一个Question对象
    ques_class = models.QUES.objects.get(quesID=ques_id)
    # 存入数据
    ans = models.ANS()
    ans.user_name = nickname
    ans.user_icon = icon_url
    ans.ans_text = pinglun
    ans.question = ques_class
    ans.save()
    if request.encoding != 200:
        return JsonResponse({'rs': 0})
    return JsonResponse({'rs': 1})

# 论坛问题点赞接口
def bbs_question_dianzan(request):
    data = request.body
    json_str = data.decode()
    dict_data = json.loads(json_str)
    print(dict_data)
    id = dict_data.get('id')
    dianzan = dict_data.get('dianzan')
    likes = QUES.objects.filter(id=id).values('quesLikes')
    for i in likes:
        like = i.get('quesLikes')
    if dianzan == 1:
        like = like + 1
    else:
        like = like - 1
    QUES.objects.filter(id=id).update(quesLikes=like)
    if dianzan == 1:
        return JsonResponse({'index': 1})
    return JsonResponse({'index': 0})



# 个人用途
import os
def upload(request):
    if request.method == "POST":
        myFile = request.FILES["myfile"].name
        with open(os.path.join("E:\\ftp_ziyuan", myFile), 'wb+') as f:
            for i in request.FILES["myfile"].chunks():
                f.write(i)
        return HttpResponse("upload over!")
    else:
        return render(request, 'upload.html')
