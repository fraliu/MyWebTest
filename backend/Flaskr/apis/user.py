from flask import Blueprint, request
from flask_jwt_extended import jwt_required
from flask_restful import Resource

from Flaskr import api, db
# from Flaskr.decorators.authUnit import login_required
from Flaskr.models import User

users = Blueprint('users', __name__)


class UserListAPI(Resource):
    # method_decorators = [jwt_required()]

    # @admin_required()
    @jwt_required()
    def get(self):
        data = {}
        users = User.query.all()
        # print(users)
        data['users'] = {}
        data['users']['user'] = []
        num = 0
        for user in users:
            num += 1
            data['users']['user'].append({'username': user.username, 'passwd': user.password_hash})
            # print(user.username, user.password_hash)
        data['users']['num'] = num
        data['code'] = 'OK'
        # data['user'] = user.username
        return data

    def post(self):
        response_object = {}
        post_data = request.get_json()
        # logging.info(post_data)
        # print(post_data)
        username = post_data['data']['username']
        password = post_data['data']['password']
        if username == '' or password == '':
            response_object['code'] = 'ERROR'
            response_object['message'] = 'Invalid username or password'
            return response_object, 400
        response_object['code'] = 'OK'
        # response_object['data'] = post_data['data']

        newUser = User(
            username=username,
            role='guest',
            profile='default profile'
        )
        newUser.hash_password(password)
        db.session.add(newUser)
        db.session.commit()
        return response_object

class UserApi(Resource):
    def get(self):
        pass

    def post(self):
        response_object = {}
        post_data = request.get_json()
        new_username = post_data['data']['new_username']
        user = post_data['data']['user']

        changeUser = User.query.filter_by(username=user).first()
        changeUser.username = new_username

        db.session.commit()
        response_object['code'] = 'OK'
        response_object['data'] = {}
        return response_object


api.add_resource(UserListAPI, '/api/users', endpoint='users')
api.add_resource(UserApi, '/api/setting', endpoint='setting')
