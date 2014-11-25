/**
 * @author Marek Krajewski
 * @date 12012010
 * 
 * The purpose of this class is to bypass the requirement of the regular ListProxy contained within
 * SoenEA imposes of the stored class type being a subclass of DomainObject.
 * 
 * Ripped almost verbatim from package org.dsrg.soenea.domain.proxy.ListProxy;
 */

package clap.service.applicationlog.request;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

import org.dsrg.soenea.domain.proxy.ProxyException;

public abstract class SimpleListProxy<OBJECT> implements List<OBJECT> {
	
	private List<OBJECT> innerList;

	protected abstract List<OBJECT> getActualList() throws Exception;

	private synchronized List<OBJECT> getInnerList() {
		if(innerList==null)
			try {
				innerList = getActualList();
			} catch (Exception e) {
				throw new ProxyException(e);
			}
			return innerList;
	}

	public boolean add(OBJECT o) {
		return getInnerList().add(o);
	}

	public void add(int index, OBJECT element) {
		getInnerList().add(index, element);
	}

	public boolean addAll(Collection<? extends OBJECT> c) {
		return getInnerList().addAll(c);
	}

	public boolean addAll(int index, Collection<? extends OBJECT> c) {
		return getInnerList().addAll(index, c);
	}

	public void clear() {
		getInnerList().clear();
	}

	public boolean contains(Object o) {
		return getInnerList().contains(o);
	}

	public boolean containsAll(Collection<?> c) {
		return getInnerList().containsAll(c);
	}

	public OBJECT get(int index) {
		return getInnerList().get(index);
	}

	public int indexOf(Object o) {
		return getInnerList().indexOf(o);
	}

	public boolean isEmpty() {
		return getInnerList().isEmpty();
	}

	public Iterator<OBJECT> iterator() {
		return getInnerList().iterator();
	}

	public int lastIndexOf(Object o) {
		return getInnerList().lastIndexOf(o);
	}

	public ListIterator<OBJECT> listIterator() {
		return getInnerList().listIterator();
	}

	public ListIterator<OBJECT> listIterator(int index) {
		return getInnerList().listIterator(index);
	}

	public boolean remove(Object o) {
		return getInnerList().remove(o);
	}

	public OBJECT remove(int index) {
		return getInnerList().remove(index);
	}

	public boolean removeAll(Collection<?> c) {
		return getInnerList().removeAll(c);
	}

	public boolean retainAll(Collection<?> c) {
		return getInnerList().retainAll(c);
	}

	public OBJECT set(int index, OBJECT element) {
		return getInnerList().set(index, element);
	}

	public int size() {
		return getInnerList().size();
	}

	public List<OBJECT> subList(int fromIndex, int toIndex) {
		return getInnerList().subList(fromIndex, toIndex);
	}

	public Object[] toArray() {
		return getInnerList().toArray();
	}

	public <T> T[] toArray(T[] a) {
		return getInnerList().toArray(a);
	}

	@Override
	public String toString() {
		return getInnerList().toString();
	}
}

