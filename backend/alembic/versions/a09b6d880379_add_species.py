"""Add Species

Revision ID: a09b6d880379
Revises: 7521fd7984bb
Create Date: 2020-09-20 02:31:10.119585

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a09b6d880379'
down_revision = '7521fd7984bb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index('ix_tree_id', table_name='tree')
    op.drop_table('tree')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tree',
    sa.Column('id', sa.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('description', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('age', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('specie', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.PrimaryKeyConstraint('id', name='tree_pkey')
    )
    op.create_index('ix_tree_id', 'tree', ['id'], unique=False)
    # ### end Alembic commands ###
