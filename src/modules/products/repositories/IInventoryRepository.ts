import IAddInventoryDTO from '../dtos/IAddInventoryDTO';
import ProductsInventory from '../infra/typeorm/entities/ProductsInventory';

export default interface IInventoryRepository {
  findQuantityById(productId: string): Promise<ProductsInventory>;
  findAllInventory(): Promise<ProductsInventory>;
  create(inventoryData: IAddInventoryDTO): Promise<ProductsInventory>;
}
