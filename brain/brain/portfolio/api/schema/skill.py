from ninja import Schema


class SkillSchema(Schema):
    id: int
    name: str
    category: str
