using Domain.Entities;

namespace Domain.Interfaces
{
	public interface IRemnantsRepository 
	{
		Task<Remnants> GetRemnants(int nomenclatureId, Guid stockId);
	}
}
