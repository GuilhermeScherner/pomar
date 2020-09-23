"""Adjustt

Revision ID: 1fa01feadb6f
Revises: ec2720ceeb5e
Create Date: 2020-09-20 17:36:50.133329

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1fa01feadb6f'
down_revision = 'ec2720ceeb5e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tree_group', sa.Column('tree_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'tree_group', 'tree', ['tree_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'tree_group', type_='foreignkey')
    op.drop_column('tree_group', 'tree_id')
    # ### end Alembic commands ###