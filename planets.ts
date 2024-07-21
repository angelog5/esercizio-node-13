import { Request, Response } from "express";
import { IDatabase } from "pg-promise";

export const getAll = async (req: Request, res: Response) => {
  const db: IDatabase<any> = req.db;
  const planets = await db.any("SELECT * FROM planets;");
  res.json(planets);
};

export const getOneById = async (req: Request, res: Response) => {
  const db: IDatabase<any> = req.db;
  const id = parseInt(req.params.id);
  const planet = await db.oneOrNone("SELECT * FROM planets WHERE id=$1;", id);
  if (planet) {
    res.json(planet);
  } else {
    res.status(404).send("Planet not found");
  }
};

export const create = async (req: Request, res: Response) => {
  const db: IDatabase<any> = req.db;
  const { name } = req.body;
  await db.none("INSERT INTO planets (name) VALUES ($1);", name);
  res.status(201).json({ name });
};

export const updateById = async (req: Request, res: Response) => {
  const db: IDatabase<any> = req.db;
  const id = parseInt(req.params.id);
  const { name } = req.body;
  await db.none("UPDATE planets SET name=$2 WHERE id=$1;", [id, name]);
  res.json({ id, name });
};

export const deleteById = async (req: Request, res: Response) => {
  const db: IDatabase<any> = req.db;
  const id = parseInt(req.params.id);
  await db.none("DELETE FROM planets WHERE id=$1;", id);
  res.status(204).send();
};
