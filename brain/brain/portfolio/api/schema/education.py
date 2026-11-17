from datetime import date

from ninja import Schema


class EducationSchema(Schema):
    id: int
    institution: str
    location: str
    degree_level: str
    degree_title: str
    major: str
    minor: str
    start_date: date
    end_date: date | None = None
    gpa: float | None = None
    order: int


class EducationCreateSchema(Schema):
    institution: str
    location: str = ""
    degree_level: str
    degree_title: str = ""
    major: str = ""
    minor: str = ""
    start_date: date
    end_date: date | None = None
    gpa: float | None = None
    order: int = 0


class EducationUpdateSchema(Schema):
    institution: str | None = None
    location: str | None = None
    degree_level: str | None = None
    degree_title: str | None = None
    major: str | None = None
    minor: str | None = None
    start_date: date | None = None
    end_date: date | None = None
    gpa: float | None = None
    order: int | None = None
