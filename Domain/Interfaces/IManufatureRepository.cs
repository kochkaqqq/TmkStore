using Domain.Entities;

namespace Domain.Interfaces
{
	public interface IManufatureRepository
	{
		Task<ICollection<Manufacturer>> GetManufacturers(CancellationToken cancellationToken); 
	}
}
