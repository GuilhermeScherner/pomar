"""Add all tables

Revision ID: 15b85a5ebe23
Revises: 4f5b18e3bd48
Create Date: 2020-09-20 05:04:09.036566

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '15b85a5ebe23'
down_revision = '4f5b18e3bd48'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tree_group',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('description', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_tree_group_id'), 'tree_group', ['id'], unique=False)
    op.create_index(op.f('ix_tree_group_name'), 'tree_group', ['name'], unique=True)
    op.create_table('harvest',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('tree_id', sa.Integer(), nullable=True),
    sa.Column('info', sa.String(), nullable=True),
    sa.Column('date_harvest', sa.String(), nullable=True),
    sa.Column('weight', sa.Float(), nullable=True),
    sa.ForeignKeyConstraint(['tree_id'], ['tree.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_harvest_id'), 'harvest', ['id'], unique=False)
    op.create_index(op.f('ix_harvest_tree_id'), 'harvest', ['tree_id'], unique=False)
    op.add_column('tree', sa.Column('group_id', sa.Integer(), nullable=True))
    op.create_foreign_key(None, 'tree', 'tree_group', ['group_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'tree', type_='foreignkey')
    op.drop_column('tree', 'group_id')
    op.drop_index(op.f('ix_harvest_tree_id'), table_name='harvest')
    op.drop_index(op.f('ix_harvest_id'), table_name='harvest')
    op.drop_table('harvest')
    op.drop_index(op.f('ix_tree_group_name'), table_name='tree_group')
    op.drop_index(op.f('ix_tree_group_id'), table_name='tree_group')
    op.drop_table('tree_group')
    # ### end Alembic commands ###
