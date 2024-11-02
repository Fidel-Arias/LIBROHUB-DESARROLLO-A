"""Welcome to Reflex! This file outlines the steps to create a basic app."""

import reflex as rx
from .Navbar import *
from rxconfig import config
from sqlalchemy import text


class Operaciones_base_de_datos(rx.State):
    libros_serializable : list[dict] = []
    libro_detalle : dict = {}
    id_libro: int = 0
        
    @classmethod
    def mostrar_libros(self):
        libros_serializable_temp: list[dict] = []
        with rx.session() as session:
            try:
                libros = session.execute(
                    text("CALL devolver_libros()")
                ).fetchall()
                for libro in libros:
                    libros_serializable_temp.append({
                        "id_libro": str(libro[0]),
                        "titulo": libro[1],
                        "autor": libro[2],
                        "genero": libro[3],
                        "precio": float(libro[4]),
                        "stock": libro[5],
                        "imagen_url": libro[6]
                    })
                self.libros_serializable = libros_serializable_temp
                session.close()
            except Exception as e:
                print(f"Error al obtener los libros: {e}")

    def obtener_id(self):
        args = self.router.page.params
        self.id_libro = args.get('id', [])
        print('id: ', self.id_libro)
    def detalle_libro(self):
        try: 
            # args = rx.Var()
            # print('Params: ', args)
            # id = args.get('id', [])
            # print(id)
            with rx.session() as session:
                libro = session.execute(
                    text("CALL detalle_libro(:id)"), {'id': self.id_libro},
                ).fetchone()
                self.libro_detalle = {
                    "id_libro": str(libro[0]),
                    "titulo": libro[1],
                    "autor": libro[2],
                    "genero": libro[3],
                    "precio": float(libro[4]),
                    "stock": libro[5],
                    "imagen_url": libro[6]
                }
                session.close()
        except Exception as e:
            print(f"Error al obtener el detalle del libro: {e}")
            return ""

def mostrar():
    Operaciones_base_de_datos.mostrar_libros()
    return rx.grid(
        rx.foreach(
            Operaciones_base_de_datos.libros_serializable,
            lambda libro: rx.card(
                rx.center(rx.image(src=libro['imagen_url'], width="60%", height="auto")),
                rx.box(
                    rx.center(
                        rx.link(
                            f"{libro['titulo']}",
                            href=f"/detalle_libro/{libro['id_libro']}",
                            size="4",
                            weight="bold",
                            color_scheme="cyan",
                            on_click=Operaciones_base_de_datos.obtener_id,
                        ),
                    ),
                    rx.text(f"{libro['autor']}\n", align="center"),
                    rx.text(f"Precio: S/.{libro['precio']}\n", align="center"),
                    rx.text(f"Stock: {libro['stock']}\n", align="center"),
                    margin_bottom="10px",
                ),
                rx.center(
                    rx.button(
                        'Agregar al carrito',
                        color_scheme="yellow",
                        cursor="pointer",
                    )
                ),
                
            )
        ),
        columns="3",
        spacing="4",
        width="100%"
    )

@rx.page(route="/detalle_libro/[id]")
def detalle_libro_page() -> rx.Component:
    return rx.box(
        # Operaciones_base_de_datos.detalle_libro,
        rx.container(
            rx.center(
                rx.card(
                    rx.hstack(
                        rx.image(src=Operaciones_base_de_datos.libro_detalle['imagen_url'], width="30%", height="30%"),
                        rx.box(
                            rx.vstack(
                                rx.heading(f"{Operaciones_base_de_datos.libro_detalle['titulo']}\n", size="4"),
                                rx.text(f"{Operaciones_base_de_datos.libro_detalle['autor']}\n"),
                                rx.text(f"Precio: S/.{Operaciones_base_de_datos.libro_detalle['precio']}\n", align="center"),
                                rx.text(f"Stock: {Operaciones_base_de_datos.libro_detalle['stock']}\n", align="center"),
                                margin_top="3em",
                            ),
                        ),
                    ),
                    width="80%"
                ),
            ),
        ),
    ),
    



@rx.page(route="/", title='LibroHub')
def index() -> rx.Component:
    # Welcome Page (Index)
    return rx.box(
        navbar_second(),
        navbar_searchbar(),
        rx.container(
            mostrar(),
            size="3",
        ),
        width="100%"
    )

app = rx.App(
    theme=rx.theme(
        appearance="light",
        has_background=True
    )
)
app.add_page(index)
app.add_page(detalle_libro_page)