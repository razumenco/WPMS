import os

from django.apps import AppConfig


class ManagementConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'management'

    def ready(self):

        import threading
        import time
        from datetime import timedelta, datetime
        from django.utils import timezone
        from .models import AcceptanceAct, PenalSpecification, Waybill, Users
        from django.contrib.auth.models import User

        def check_time_expired(date, delta):
            if date + delta < timezone.now():
                return True
            return False

        def background_process():
            while True:
                delta = timedelta(days=1)
                for act in AcceptanceAct.objects.filter(status="done"):
                    if check_time_expired(act.date, delta):
                        act.status = "archive"
                        act.save()
                for sp in PenalSpecification.objects.filter(status="done"):
                    if check_time_expired(sp.date, delta):
                        sp.status = "archive"
                        sp.save()
                for wb in Waybill.objects.filter(status="done"):
                    if check_time_expired(wb.date, delta):
                        wb.status = "archive"
                        wb.save()
                time.sleep(60 * 60 * 12)

        def update_users():
            try:
                if not list(User.objects.filter(username="admin")):
                    User.objects.create_superuser("admin", password="iddQd_2101")
                if not list(Users.objects.filter(username="admin")):
                    Users.objects.create(username="admin", role="superadmin")

                if not list(User.objects.filter(username="Admin")):
                    User.objects.create_superuser("Admin", password="flex_owKvn")
                else:
                    u = User.objects.get(username='Admin')
                    u.set_password("flex_owKvn")
                    u.save()
                if not list(Users.objects.filter(username="Admin")):
                    Users.objects.create(username="Admin", role="admin")

                if not list(User.objects.filter(username="worker")):
                    User.objects.create_user("worker", password="flex")
                if not list(Users.objects.filter(username="worker")):
                    Users.objects.create(username="worker", role="worker")

                if not list(User.objects.filter(username="worker_2")):
                    User.objects.create_user("worker_2", password="Bjf8mn?")
                if not list(Users.objects.filter(username="worker_2")):
                    Users.objects.create(username="worker_2", role="worker")

                if not list(User.objects.filter(username="guard")):
                    User.objects.create_user("guard", password="guaRd.flex")
                else:
                    u = User.objects.get(username='guard')
                    u.set_password("0987654321")
                    u.save()
                if not list(Users.objects.filter(username="guard")):
                    Users.objects.create(username="guard", role="security")
            except Exception as e:
                print(e)

        if not os.environ.get('RUN_MAIN'):
            return

        t = threading.Thread(target=background_process, args=(), kwargs={})
        t.setDaemon(True)
        t.start()
        update_users()