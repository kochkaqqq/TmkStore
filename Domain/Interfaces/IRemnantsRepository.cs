using Domain.Entities;

namespace Domain.Interfaces
{
	public interface IRemnantsRepository 
	{
		Task<Remnants> GetRemnants(string nomenclatureId, Guid stockId);
	}
}
