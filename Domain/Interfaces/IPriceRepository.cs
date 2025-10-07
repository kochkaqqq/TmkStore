using Domain.Entities;
using Domain.Enums;

namespace Domain.Interfaces
{
	public interface IPriceRepository
	{
		Task<Price> GetPrice(int nomenclatureId, Guid stockId);

		Task<decimal> CountAmount (int nomenclatureId, Guid stockId, decimal quantity, ScaleType scale);
	}
}
