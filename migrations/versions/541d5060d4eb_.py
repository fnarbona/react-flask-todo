"""empty message

Revision ID: 541d5060d4eb
Revises: ddc8799a6ec0
Create Date: 2021-06-25 12:33:16.528121

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '541d5060d4eb'
down_revision = 'ddc8799a6ec0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('todo', sa.Column('complete', sa.Boolean(), nullable=True, default=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('todo', 'complete')
    # ### end Alembic commands ###
