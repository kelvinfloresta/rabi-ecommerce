import Category from 'src/entities/Category.entity';

export interface ISaveCategoryCaseInput extends Omit<Category, 'id'> {}
