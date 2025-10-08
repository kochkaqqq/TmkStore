using Domain.Entities;
using Domain.Enums;

namespace Domain.Interfaces
{
	public interface IPriceRepository
	{
		Task<Price> GetPrice(string nomenclatureId, Guid stockId);

		Task<decimal> CountAmount (string nomenclatureId, Guid stockId, decimal quantity, ScaleType scale);
	}
}
