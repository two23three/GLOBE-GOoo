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
class DeleteLocation(Resource):
    @jwt_required()
    def delete(self, location_id):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return {"message": "User not found"}, 404
        
        location = Location.query.get(location_id)
        
        if not location:
            return {"message": "Location not found"}, 404
        
        db.session.delete(location)
        db.session.commit()
        return {"message": "Location has been deleted successfully"}, 200
administrator_api.add_resource(DeleteLocation, '/delete_location/<int:location_id>')

class UpdateLocation(Resource):
    @jwt_required()
    def put(self, location_id):
        data = location_args.parse_args()
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        
        if not user:
            return {"message": "User not found"}, 404
        
        location = Location.query.get(location_id)
        
        if not location:
            return {"message": "Location not found"}, 404
        
        location.name = data["name"]
        location.description = data["description"]
        db.session.commit()
        return {"message": "Location has updated successfully"}, 200

administrator_api.add_resource(UpdateLocation, '/update_location/<int:location_id>')
