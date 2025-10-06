namespace Domain.Interfaces
{
	public interface ITypeRepository
	{
		Entities.Type GetType(Guid typeId);
	}
}
