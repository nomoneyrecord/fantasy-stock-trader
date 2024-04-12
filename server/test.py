# test.py
import unittest
from app import create_app
from models import db

class BasicTests(unittest.TestCase):

    def setUp(self):
        # Create a test client using the Flask application configured for testing
        self.app = create_app('testing')
        self.client = self.app.test_client()

        # Pushes an application context manually
        with self.app.app_context():
            db.create_all()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

    def test_main_page(self):
        response = self.client.get('/api/some_endpoint', follow_redirects=True)
        self.assertEqual(response.status_code, 200)

    # More tests can be added here

if __name__ == "__main__":
    unittest.main()
