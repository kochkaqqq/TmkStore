using Domain.Entities;

namespace Domain.Interfaces
{
	public interface IGostRepository
	{
		Task<ICollection<Gost>> GetGosts(CancellationToken cancellationToken);
	}
}
