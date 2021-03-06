package gdrj

import (
	"errors"
	"github.com/eaciit/orm/v1"
	"github.com/eaciit/toolkit"
)

type ProfitCenter struct {
	orm.ModelBase   `json:"-" bson:"-"`
	ID              string `json:"_id" bson:"_id"` //PCID
	EntityID        string
	Name            string
	BrandID         string
	BrandCategoryID string
	BranchID        string
	BranchType      BranchTypeEnum
}

func (p *ProfitCenter) RecordID() interface{} {
	return p.ID
}

func (p *ProfitCenter) TableName() string {
	return "profitcenter"
}

func ProfitCenterGetByID(id string) *ProfitCenter {
	p := new(ProfitCenter)
	DB().GetById(p, id)
	return p
}

func (p *ProfitCenter) Save() error {
	e := Save(p)
	if e != nil {
		return errors.New(toolkit.Sprintf("[%v-%v] Error found : ", p.TableName(), "save", e.Error()))
	}
	return e
}

func (p *ProfitCenter) Delete() error {
	e := Delete(p)
	if e != nil {
		return errors.New(toolkit.Sprintf("[%v-%v] Error found : ", p.TableName(), "delete", e.Error()))
	}
	return e
}
