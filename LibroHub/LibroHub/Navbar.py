import reflex as rx

def navbar_searchbar() -> rx.Component:
    return rx.box(
        rx.desktop_only(
            rx.hstack(
                rx.hstack(
                    rx.link("Inicio", href="#", underline="none", color="white"),
                    rx.link("Libros", href="#", underline="none", color="white"),
                    rx.link("Ofertas", href="#", underline="none", color="white"),
                    rx.link("Plan Lector", href="#", underline="none", color="white"),
                    rx.link("Novedades", href="#", underline="none", color="white"),
                    align_items="center",
                ),
                rx.input(
                    rx.input.slot(rx.icon("search", stroke_width=3, size=25),),
                    placeholder="Search...",
                    background="white",
                    type="search",
                    size="3",
                    justify="end",
                    width="35%",
                    height="10%"
                ),
                rx.hstack(
                    rx.box(
                        rx.hstack(
                            rx.icon("shopping_cart", border="white", color="white", stroke_width=3),
                            rx.link(
                                "Carrito", 
                                color="white", 
                                href="#", 
                                size="2", 
                                underline="none",
                                weight="bold"
                            ),
                            align="center",
                            spacing="2",
                        ),
                        size="2",
                        margin_left="0.5em",
                        color_scheme="green",
                        hover_color_scheme="green",
                        cursor="pointer"
                    ),
                    align="center"
                ),
                justify="between",
                align_items="center",
            ),
        ),
        background="#3A1D1D",
        padding="1em",
        # position="fixed",
        # top="0px",
        # z_index="5",
        width="100%",
    )

def navbar_second() -> rx.Component:
    return rx.box(
        rx.desktop_only(
            rx.hstack(
                rx.hstack(
                    rx.heading(
                        "LibroHub", size="7", color="#ffd700", weight="bold"
                    ),
                    align_items="center",
                ),
                rx.box(
                    rx.hstack(
                        rx.link(
                            "Mi cuenta",
                            color="white",
                            href="#",
                            size="2",
                            margin_left="1em",
                            underline="none",
                            weight="bold"
                        ),
                        size="2",
                        margin_left="0.5em",
                        color_scheme="green",
                        hover_color_scheme="green",
                        cursor="pointer"
                    ),
                ),
                justify="between",
                align_items="center",
            ),
        ),
        background="#1E1E1E",
        padding="1em",
        width="100%",
    )
