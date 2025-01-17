"""empty message

Revision ID: aeaba4f5473f
Revises: 
Create Date: 2024-10-30 03:21:28.780127

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql
import sqlmodel

# revision identifiers, used by Alembic.
revision: str = 'aeaba4f5473f'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('detalles_pedido')
    op.drop_table('autores')
    op.drop_table('libros')
    op.drop_table('generos')
    with op.batch_alter_table('administradores', schema=None) as batch_op:
        batch_op.drop_index('correo')

    op.drop_table('administradores')
    with op.batch_alter_table('clientes', schema=None) as batch_op:
        batch_op.drop_index('correo')

    op.drop_table('clientes')
    op.drop_table('pedidos')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('pedidos',
    sa.Column('id_pedido', mysql.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('id_cliente', mysql.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('fecha_pedido', sa.DATE(), nullable=False),
    sa.Column('monto_total', mysql.DECIMAL(precision=10, scale=2), nullable=True),
    sa.ForeignKeyConstraint(['id_cliente'], ['clientes.id_cliente'], name='pedidos_ibfk_1', onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id_pedido'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.create_table('clientes',
    sa.Column('id_cliente', mysql.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('nombre', mysql.VARCHAR(length=255), nullable=False),
    sa.Column('ap_paterno', mysql.VARCHAR(length=35), nullable=False),
    sa.Column('ap_materno', mysql.VARCHAR(length=35), nullable=False),
    sa.Column('correo', mysql.VARCHAR(length=255), nullable=False),
    sa.Column('contrasenia', mysql.VARCHAR(length=255), nullable=False),
    sa.Column('direccion', mysql.VARCHAR(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id_cliente'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    with op.batch_alter_table('clientes', schema=None) as batch_op:
        batch_op.create_index('correo', ['correo'], unique=True)

    op.create_table('administradores',
    sa.Column('id_administrador', mysql.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('nombre', mysql.VARCHAR(length=50), nullable=False),
    sa.Column('ap_paterno', mysql.VARCHAR(length=35), nullable=False),
    sa.Column('ap_materno', mysql.VARCHAR(length=35), nullable=False),
    sa.Column('correo', mysql.VARCHAR(length=50), nullable=False),
    sa.Column('contrasenia', mysql.VARCHAR(length=255), nullable=False),
    sa.Column('rol', mysql.VARCHAR(length=5), server_default=sa.text("'admin'"), nullable=True),
    sa.PrimaryKeyConstraint('id_administrador'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    with op.batch_alter_table('administradores', schema=None) as batch_op:
        batch_op.create_index('correo', ['correo'], unique=True)

    op.create_table('generos',
    sa.Column('id_genero', mysql.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('nombre', mysql.VARCHAR(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id_genero'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.create_table('libros',
    sa.Column('id_libro', mysql.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('titulo', mysql.VARCHAR(length=255), nullable=False),
    sa.Column('id_autor', mysql.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('id_genero', mysql.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('precio', mysql.DECIMAL(precision=10, scale=2), nullable=False),
    sa.Column('stock', mysql.INTEGER(), server_default=sa.text("'0'"), autoincrement=False, nullable=True),
    sa.Column('fecha_publicacion', sa.DATE(), nullable=True),
    sa.ForeignKeyConstraint(['id_autor'], ['autores.id_autor'], name='libros_ibfk_1', onupdate='CASCADE', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['id_genero'], ['generos.id_genero'], name='libros_ibfk_2', onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id_libro'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.create_table('autores',
    sa.Column('id_autor', mysql.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('nombre', mysql.VARCHAR(length=255), nullable=False),
    sa.Column('biografia', mysql.TEXT(), nullable=True),
    sa.PrimaryKeyConstraint('id_autor'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.create_table('detalles_pedido',
    sa.Column('id_detalle_pedido', mysql.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('id_pedido', mysql.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('id_libro', mysql.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('cantidad', mysql.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('precio', mysql.DECIMAL(precision=10, scale=2), nullable=False),
    sa.ForeignKeyConstraint(['id_libro'], ['libros.id_libro'], name='detalles_pedido_ibfk_2', onupdate='CASCADE', ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['id_pedido'], ['pedidos.id_pedido'], name='detalles_pedido_ibfk_1', onupdate='CASCADE', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id_detalle_pedido'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    # ### end Alembic commands ###
