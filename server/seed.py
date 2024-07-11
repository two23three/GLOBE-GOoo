from flask import Flask
from models import db, User, Location, Ticket, Review
import os

app = Flask(__name__)

# Use the same database URI as your main app
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()

    # Create sample users
    user1 = User(username='tulley', email='tulley@example.com', password='password123')
    user2 = User(username='victor', email='victor@example.com', password='password123')

    # Create sample locations with images
    location1 = Location(
        name='Dubai', 
        description='A vibrant city in the United Arab Emirates known for luxury shopping, ultramodern architecture, and a lively nightlife scene.',
        image_url=os.path.join('uploads', 'dubai.png')
    )
    location2 = Location(
        name='Mauritius', 
        description='An island nation in the Indian Ocean known for its beaches, lagoons, and reefs.',
        image_url=os.path.join('uploads', 'mauritius.png')  # Assuming you have mauritius.png as well
    )
    location3 = Location(
        name='Beach Paradise', 
        description='A beautiful sunny beach.', 
        image_url=os.path.join('uploads', 'beach-paradise.png')  # Assuming you have beach-paradise.png
    )
    location4 = Location(
        name='Mountain Retreat', 
        description='A peaceful mountain retreat.', 
        image_url=os.path.join('uploads', 'mountain-retreat.png')  # Assuming you have mountain-retreat.png
    )

    # Create sample tickets
    ticket1 = Ticket(user=user1, location=location1, price=150.0, means='Plane', seat_no=1)
    ticket2 = Ticket(user=user2, location=location2, price=250.0, means='Plane', seat_no=2)
    ticket3 = Ticket(user=user1, location=location3, price=100.0, means='Bus', seat_no=3)
    ticket4 = Ticket(user=user2, location=location4, price=200.0, means='Train', seat_no=4)

    # Create sample reviews
    review1 = Review(user=user1, location=location1, rating=5, comment='Dubai is amazing!')
    review2 = Review(user=user2, location=location2, rating=4, comment='Mauritius is very relaxing.')
    review3 = Review(user=user1, location=location3, rating=5, comment='Beach Paradise is fantastic!')
    review4 = Review(user=user2, location=location4, rating=4, comment='Mountain Retreat is very peaceful.')

    # Add all to the session
    db.session.add_all([user1, user2, location1, location2, location3, location4, ticket1, ticket2, ticket3, ticket4, review1, review2, review3, review4])

    # Commit the session
    db.session.commit()

    print("Database seeded!")
