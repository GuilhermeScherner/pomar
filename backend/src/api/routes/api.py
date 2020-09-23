from fastapi import APIRouter

from src.api.routes import tree, species, group, harvest


router = APIRouter()



router.include_router(tree.router, tags=["tree"])
router.include_router(species.router, tags=["specie"])
router.include_router(group.router, tags=["group"])
router.include_router(harvest.router, tags=["harvest"])
