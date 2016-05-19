package gdrj

import (
	"errors"
	"github.com/eaciit/orm/v1"
	"github.com/eaciit/toolkit"
)

type BranchTypeEnum int

const (
	TypeBranch    BranchTypeEnum = 1
	OfficeBranch                 = 2
	FactoryBranch                = 3
)

type Branch struct {
	orm.ModelBase `json:"-" bson:"-"`
	BranchID      string `json:"_id" bson:"_id"`
	Name          string
	Location      string
}

func (b *Branch) RecordID() interface{} {
	return b.BranchID
}

func (b *Branch) TableName() string {
	return "branch"
}

func BranchGetByID(id string) *Branch {
	b := new(Branch)
	DB().GetById(b, id)
	return b
}

func (b *Branch) Save() error {
	e := Save(b)
	if e != nil {
		return errors.New(toolkit.Sprintf("[%v-%v] Error found : ", b.TableName(), "save", e.Error()))
	}
	return e
}

func (b *Branch) Delete() error {
	e := Delete(b)
	if e != nil {
		return errors.New(toolkit.Sprintf("[%v-%v] Error found : ", b.TableName(), "delete", e.Error()))
	}
	return e
}

func (b BranchTypeEnum) String() string {
	switch b {
	case TypeBranch:
		return "branch"
	case OfficeBranch:
		return "office"
	case FactoryBranch:
		return "factory"
	}

	return "unknown"
}