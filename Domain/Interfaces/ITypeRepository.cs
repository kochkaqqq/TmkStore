namespace Domain.Interfaces
{
	public interface ITypeRepository
	{
		Task<Entities.Type> GetType(Guid typeId, CancellationToken cancellationToken);

		Task<ICollection<Entities.Type>> GetAllTypes(CancellationToken cancellationToken);
	}
}
