import reflex as rx
from sqlmodel import create_engine

config = rx.Config(
    app_name="LibroHub",
    db_url="mysql+pymysql://root:root@localhost/librohub"
)