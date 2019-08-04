import {Injectable} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";
import {NotifyMessageService} from "../../../../services/notify-message.service";
import {ChatGroupListComponent} from "./chat-group-list.component";

@Injectable({
    providedIn: 'root'
})

export class ChatGroupEditService{

    private _chatGroupListComponent: ChatGroupListComponent;

    constructor(private notifyMessage: NotifyMessageService){

    }

    set ChatGroupListComponent(value: ChatGroupListComponent){
        this._chatGroupListComponent = value;
    }

    showModalEdit(chatGroupId: number){
        this._chatGroupListComponent.chatGroupId = chatGroupId;
        this._chatGroupListComponent.chatGroupEditModal.showModal();
    }

    onEditError($event: HttpErrorResponse) {
        this.notifyMessage.error(`Erro ao editar Grupo... ${$event}`);
    }

    onEditSucess($event: any) {
        this.notifyMessage.success('Grupo atualizado com sucesso!');
        this._chatGroupListComponent.getChatGroups();
    }
}