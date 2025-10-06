using Domain.DAL.Stocks;
using Domain.Entities;

namespace Domain.Interfaces
{
	public interface IStockRepository 
	{
		Stock GetStock(Guid stockId);
	}
}
