from flask import Blueprint 
from flask_restful import Api,Resource, reqparse 
from flask_jwt_extended import jwt_required, get_jwt_identity,JWTManager
from models import db, Location, User

administrator_bp = Blueprint('administrator_bp',__name__, url_prefix='/administrator')
administrator_api = Api(administrator_bp)

location_args = reqparse.RequestParser()
location_args.add_argument("name", type=str, help="Name of the location")
location_args.add_argument("description", type=str, help="Description of the location")

class AddLocation(Resource):
    @jwt_required()
    def post(self):
        data = location_args.parse_args()
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return {"message": "User not found"}, 404
        
        location = Location(name=data["name"], description=data["description"])
        db.session.add(location)
        db.session.commit()
        return {"message": "Location added successfully"}, 201

administrator_api.add_resource(AddLocation, '/add_location')
