"""Adjust

Revision ID: 6ba1927b1b93
Revises: 1fa01feadb6f
Create Date: 2020-09-20 17:42:01.290207

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6ba1927b1b93'
down_revision = '1fa01feadb6f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('tree_group_tree_id_fkey', 'tree_group', type_='foreignkey')
    op.drop_column('tree_group', 'tree_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tree_group', sa.Column('tree_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.create_foreign_key('tree_group_tree_id_fkey', 'tree_group', 'tree', ['tree_id'], ['id'])
    # ### end Alembic commands ###
